import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

// Trie Node class
class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

// Trie data structure
class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the Trie
    insert(word: string): void {
        let current = this.root;

        for (const char of word.toLowerCase()) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }

        current.isEndOfWord = true;
    }

    // Search for all words with a given prefix
    searchPrefix(prefix: string): string[] {
        let current = this.root;

        // Navigate to the end of the prefix
        for (const char of prefix.toLowerCase()) {
            if (!current.children.has(char)) {
                return []; // No words with this prefix
            }
            current = current.children.get(char)!;
        }

        // Collect all words from this node
        const results: string[] = [];
        this.collectWords(current, prefix.toLowerCase(), results);
        return results;
    }

    // Helper method to collect all words from a given node
    private collectWords(
        node: TrieNode,
        currentPrefix: string,
        results: string[]
    ): void {
        if (node.isEndOfWord) {
            results.push(currentPrefix);
        }

        for (const [char, childNode] of node.children) {
            this.collectWords(childNode, currentPrefix + char, results);
        }
    }

    // Get all words from the Trie (for fuzzy search)
    getAllWords(): string[] {
        const results: string[] = [];
        this.collectWords(this.root, "", results);
        return results;
    }
}

// Levenshtein Distance Algorithm
function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j] + 1 // deletion
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

// Fuzzy search with Levenshtein distance
function fuzzySearch(
    query: string,
    words: string[],
    maxDistance: number = 2
): Array<{ word: string; distance: number }> {
    const results: Array<{ word: string; distance: number }> = [];
    const queryLower = query.toLowerCase();

    for (const word of words) {
        const distance = levenshteinDistance(queryLower, word.toLowerCase());
        if (distance <= maxDistance) {
            results.push({ word, distance });
        }
    }

    // Sort by distance (closest matches first), then alphabetically
    return results.sort((a, b) => {
        if (a.distance === b.distance) {
            return a.word.localeCompare(b.word);
        }
        return a.distance - b.distance;
    });
}

let cachedTrie: Trie | null = null;
let cachedWords: string[] = [];
let totalWordsCount = 0;

function getTrie(): Trie {
    if (cachedTrie === null) {
        cachedTrie = new Trie();

        try {
            const filePath = join(process.cwd(), "src/lib/wordlist.txt");
            const fileContent = readFileSync(filePath, "utf-8");
            const words = fileContent
                .split("\n")
                .map((word) => word.trim())
                .filter((word) => word.length > 0);

            // Build the Trie and cache words
            console.log("Building Trie from wordlist...");
            for (const word of words) {
                cachedTrie.insert(word);
            }

            cachedWords = words;
            totalWordsCount = words.length;
            console.log(
                `Trie built successfully with ${totalWordsCount} words`
            );
        } catch (error) {
            console.error("Error reading wordlist:", error);
            totalWordsCount = 0;
            cachedWords = [];
        }
    }

    return cachedTrie;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const limit = parseInt(searchParams.get("limit") || "10");
    const fuzzy = searchParams.get("fuzzy") === "true";
    const maxDistance = parseInt(searchParams.get("maxDistance") || "2");

    // Validate query parameter
    if (!query) {
        return NextResponse.json(
            { error: "Query parameter is required" },
            { status: 400 }
        );
    }

    const trie = getTrie();
    let matches: string[] = [];
    let searchType = "prefix";

    if (fuzzy) {
        // Fuzzy search using Levenshtein distance
        const fuzzyResults = fuzzySearch(query, cachedWords, maxDistance);
        matches = fuzzyResults.slice(0, limit).map((result) => result.word);
        searchType = "fuzzy";
    } else {
        // Exact prefix search using Trie
        matches = trie.searchPrefix(query).slice(0, limit);
    }

    // If prefix search yields few results, supplement with fuzzy matches
    if (!fuzzy && matches.length < limit && query.length >= 3) {
        const fuzzyResults = fuzzySearch(query, cachedWords, 1);
        const additionalMatches = fuzzyResults
            .map((result) => result.word)
            .filter((word) => !matches.includes(word))
            .slice(0, limit - matches.length);

        matches = [...matches, ...additionalMatches];
        if (additionalMatches.length > 0) {
            searchType = "prefix+fuzzy";
        }
    }

    return NextResponse.json({
        query,
        matches,
        count: matches.length,
        totalWords: totalWordsCount,
        searchType,
    });
}
