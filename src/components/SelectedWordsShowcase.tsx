import React from "react";

interface SelectedWordsShowcaseProps {
    selectedWords: string[];
    onRemove?: (word: string) => void;
}

const SelectedWordsShowcase: React.FC<SelectedWordsShowcaseProps> = ({
    selectedWords,
    onRemove,
}) => {
    if (selectedWords.length === 0) {
        return (
            <div className="mt-6 p-4 bg-gray-50 border rounded text-gray-500 text-center">
                No words selected yet.
            </div>
        );
    }

    return (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">
                Selected Words
            </h2>
            <ul className="flex flex-wrap gap-2">
                {selectedWords.map((word, idx) => (
                    <li
                        key={word + idx}
                        className="relative px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm shadow-sm border border-blue-200 flex items-center"
                    >
                        {word}
                        {onRemove && (
                            <button
                                type="button"
                                aria-label={`Remove ${word}`}
                                className="ml-2 text-blue-400 hover:text-red-600 focus:outline-none text-base font-bold px-1"
                                onClick={() => onRemove(word)}
                            >
                                &times;
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedWordsShowcase;
