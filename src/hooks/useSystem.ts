import { useCallback, useState } from "react";
import { useLocalStorage } from "./useLocalStorage"
import { useCountdown } from "./useCountdown";
import { useModal } from "./useModal";
import { useKeyDown } from "./useKeyDown";
import { useWord } from "./useWord";
import { HistoryType, Results } from "@/types";
import { calculateAccuracy, calculateErrorPercentage, calculateWPM } from "@/utils";

const useSystem = () => {

    const { getLocalStorageValue, setLocalStorageValue } = useLocalStorage();
    const [time, setTime] = useState(() => getLocalStorageValue('time') || 15000)
    const { countdown, resetCountdown, startCountdown } = useCountdown(time)
    const { modalIsOpen, aboutModal, openModal, closeModal } = useModal();

    const [wordContainerFocused, setWordContainerFocused] = useState(false);
    const { word, updateWord, totalWord } = useWord(30);
    const {
        charTyped,
        cursorPosition,
        typingState,
        totalCharacterTyped,
        resetCharTyped,
        setTypingState,
        resetCursorPointer,
        setTotalCharacterTyped,
    } = useKeyDown(wordContainerFocused)

    const [results, setResults] = useState<Results>({
        accuracy: 0,
        wpm: 0,
        cpm: 0,
        error: 0,
    });

    const [history, setHistory] = useState<HistoryType>({
        wordHistory: '',
        typedHistory: '',
    });

    const restartTest = useCallback(() => {
        resetCountdown();
        resetCharTyped();
        updateWord(true);
        setTypingState('idle');
        setTotalCharacterTyped('');
    }, [
        resetCountdown,
        resetCharTyped,
        setTypingState,
        updateWord,
        setTotalCharacterTyped
    ])

    const checkCharacter = useCallback(
        (index: number) => {
            if (charTyped[index] === word[index]) {
                return true;
            } else {
                return false;
            }
        },
        [charTyped, word]
    );

    if (word.length === charTyped.length) {
        updateWord();
        resetCharTyped();
        resetCursorPointer();
    }

    if (typingState === 'start') {
        startCountdown();
        setTypingState('typing');
    }


    if (countdown === 0) {
        const { accuracy } = calculateAccuracy(totalWord, totalCharacterTyped);
        const { wpm, cpm } = calculateWPM(totalCharacterTyped, accuracy, time);
        const error = calculateErrorPercentage(accuracy);

        setResults({
            accuracy,
            wpm,
            cpm,
            error,
        });

        setHistory({
            wordHistory: totalWord,
            typedHistory: totalCharacterTyped,
        });

        openModal('result');
        restartTest();
    }

    return {
        time,
        countdown,
        modalIsOpen,
        aboutModal,
        charTyped,
        cursorPosition,
        typingState,
        totalCharacterTyped,
        wordContainerFocused,
        openModal,
        closeModal,
        setTime,
        restartTest,
        resetCountdown,
        setLocalStorageValue,
        setWordContainerFocused,
        setTypingState,
        resetCursorPointer,
        setTotalCharacterTyped,
        checkCharacter,
        updateWord,
        word,
        results,
        history
    }
}

export default useSystem
