"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SelectedWordsShowcase from "../../components/SelectedWordsShowcase";

interface AutocompleteResponse {
    query: string;
    matches: string[];
    count: number;
    totalWords: number;
    searchType: string;
}

export default function AutocompletePage() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [multiSelectEnabled, setMultiSelectEnabled] = useState(false);
    const [pendingSelectedWords, setPendingSelectedWords] = useState<string[]>(
        []
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const selectedItemRef = useRef<HTMLDivElement>(null);
    const pendingSelectedWordsRef = useRef<string[]>([]);

    // Debounced API call
    const fetchSuggestions = useCallback(async (searchQuery: string) => {
        if (searchQuery.trim().length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/words/search?query=${encodeURIComponent(
                    searchQuery
                )}&limit=10`
            );

            if (response.ok) {
                const data: AutocompleteResponse = await response.json();
                setSuggestions(data.matches);
                setSearchType(data.searchType);
                setShowSuggestions(data.matches.length > 0);
                setSelectedIndex(-1);
            } else {
                console.error("API error:", response.statusText);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error("Network error:", error);
            setSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, fetchSuggestions]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    // Handle suggestion selection
    const handleSuggestionSelect = (suggestion: string) => {
        console.log("Selected:", suggestion);
        if (!multiSelectEnabled) {
            setQuery(""); // Clear the search bar
            setShowSuggestions(false); // Close the dropdown
            setSelectedIndex(-1);
            inputRef.current?.focus();
            setSelectedWords((prev) =>
                prev.includes(suggestion) ? prev : [...prev, suggestion]
            );
        } else {
            setPendingSelectedWords((prev) => {
                const updated = prev.includes(suggestion)
                    ? prev.filter((word) => word !== suggestion)
                    : [...prev, suggestion];
                console.log("pendingSelectedWords after select:", updated);
                return updated;
            });
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                }
                break;

            case "Escape":
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Handle input focus
    const handleInputFocus = () => {
        if (suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    // Auto-scroll selected item into view during keyboard navigation
    useEffect(() => {
        if (selectedIndex >= 0 && selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);

    // Handle clicks outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Compute the count of selected items in the current dropdown
    const selectedInDropdownCount = multiSelectEnabled
        ? suggestions.filter((s) => selectedWords.includes(s)).length
        : 0;

    // Debug log for selectedWords
    console.log("SelectedWords state:", selectedWords);

    // Confirm handler for multi-select
    const handleConfirmMultiSelect = () => {
        const wordsToAdd = pendingSelectedWords;
        setSelectedWords((prev) => [
            ...prev,
            ...wordsToAdd.filter((word) => !prev.includes(word)),
        ]);
        setPendingSelectedWords([]);
        setShowSuggestions(false);
        setQuery("");
    };

    useEffect(() => {
        pendingSelectedWordsRef.current = pendingSelectedWords;
    }, [pendingSelectedWords]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Smart Autocomplete
            </h1>

            <div className="max-w-md mx-auto">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleInputFocus}
                        placeholder="Start typing to search words..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    {/* Close (×) icon to clear and close dropdown */}
                    {(query.trim() ||
                        (multiSelectEnabled &&
                            pendingSelectedWords.length > 0)) && (
                        <button
                            type="button"
                            aria-label="Clear search and pending selections"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xl focus:outline-none"
                            onClick={() => {
                                setShowSuggestions(false);
                                setQuery("");
                                setPendingSelectedWords([]);
                            }}
                        >
                            &times;
                        </button>
                    )}

                    {/* Selected count indicator (right side in search bar) */}
                    {multiSelectEnabled && selectedInDropdownCount > 0 && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-green-100 text-green-900 px-2 py-0.5 rounded text-xs font-semibold">
                            {selectedInDropdownCount} selected
                        </div>
                    )}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                        </div>
                    )}

                    {/* Suggestions dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div
                            ref={suggestionsRef}
                            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto"
                        >
                            {/* Search type indicator */}
                            {searchType && (
                                <div className="px-3 py-1 text-xs text-gray-500 border-b bg-gray-50">
                                    Search type: {searchType}
                                </div>
                            )}

                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={suggestion}
                                    ref={
                                        index === selectedIndex
                                            ? selectedItemRef
                                            : null
                                    }
                                    onClick={() =>
                                        handleSuggestionSelect(suggestion)
                                    }
                                    className={`px-4 py-2 cursor-pointer transition-colors ${
                                        index === selectedIndex
                                            ? "bg-blue-100 text-blue-900"
                                            : multiSelectEnabled &&
                                              pendingSelectedWords.includes(
                                                  suggestion
                                              )
                                            ? "bg-green-100 text-green-900"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No results message */}
                    {query.trim() &&
                        !isLoading &&
                        showSuggestions &&
                        suggestions.length === 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                                <div className="p-3 text-gray-500 text-center">
                                    No matches found for &quot;{query}&quot;
                                </div>
                            </div>
                        )}

                    {/* Pending selected words popup and confirm button for multi-select (now below dropdown) */}
                    {multiSelectEnabled &&
                        showSuggestions &&
                        pendingSelectedWords.length > 0 && (
                            <div className="relative w-full mt-2 bg-white border border-blue-300 rounded-lg shadow-lg z-20 p-4 flex flex-col items-center">
                                <div className="mb-2 w-full text-center text-blue-700 font-semibold text-sm">
                                    Pending Selection:
                                </div>
                                {/* Pending selected count badge */}
                                <div className="mb-2">
                                    <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded text-xs font-semibold">
                                        {pendingSelectedWords.length} selected
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3 w-full justify-center">
                                    {pendingSelectedWords.map((word) => (
                                        <span
                                            key={word}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs border border-blue-200"
                                        >
                                            {word}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm"
                                    onClick={handleConfirmMultiSelect}
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                </div>

                {/* Multi-select checkbox */}
                <div className="flex items-center mt-2">
                    <input
                        id="multi-select-checkbox"
                        type="checkbox"
                        checked={multiSelectEnabled}
                        onChange={(e) =>
                            setMultiSelectEnabled(e.target.checked)
                        }
                        className="mr-2"
                    />
                    <label
                        htmlFor="multi-select-checkbox"
                        className="text-sm text-gray-700"
                    >
                        Enable multi-select
                    </label>
                </div>

                {/* Selected Words Showcase */}
                <SelectedWordsShowcase
                    selectedWords={selectedWords}
                    onRemove={(word) =>
                        setSelectedWords((prev) =>
                            prev.filter((w) => w !== word)
                        )
                    }
                />

                {/* Instructions */}
                <div className="mt-4 text-sm text-gray-600 text-center">
                    <p>• Type to search with prefix matching</p>
                    <p>• Use ↑↓ arrows to navigate, Enter to select</p>
                    <p>• Supports fuzzy matching for typos</p>
                    <p>• Selected items will be logged to console</p>
                </div>
            </div>
        </div>
    );
}
