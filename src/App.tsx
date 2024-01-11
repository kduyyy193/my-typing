import { AboutPage, Countdown, Header, ModalComponent, ModalContent, Restart, TimeCategory, UserTyped, WordContainer, WordWrapper } from '@/components'
import { useSystem, useThemeContext } from '@/hooks'


function App() {

  const { systemTheme } = useThemeContext();
  const {
    word,
    time,
    countdown,
    wordContainerFocused,
    charTyped,
    modalIsOpen,
    results,
    history,
    aboutModal,
    closeModal,
    checkCharacter,
    setTime,
    setLocalStorageValue,
    restartTest,
    resetCountdown,
    setWordContainerFocused
  } = useSystem()

  return (
    <div className="h-screen w-full overflow-y-scroll"
      style={{
        backgroundColor: systemTheme.background.primary,
        color: systemTheme.text.primary
      }}
    >
      <div className='block lg:hidden'>This feature is not supported on mobile </div>
      <div className='lg:block hidden mx-8'>
        <Header />
        <TimeCategory
          time={time}
          setTime={setTime}
          restart={restartTest}
          setLocalStorage={setLocalStorageValue}
        />
        <Countdown
          countdown={countdown}
          reset={resetCountdown}
        />
        <WordWrapper
          focused={wordContainerFocused}
          setFocused={setWordContainerFocused}
        >
          <WordContainer word={word} />
          <UserTyped
            word={word}
            check={checkCharacter}
            charTyped={charTyped}
          />
        </WordWrapper>
        <Restart restart={restartTest} />
        <ModalComponent
          type='result'
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <ModalContent
            totalTime={time}
            results={results}
            history={history}
          />
        </ModalComponent>
        <ModalComponent
          type='about'
          isOpen={aboutModal}
          onRequestClose={closeModal}
        >
          <AboutPage />
        </ModalComponent>
      </div>
    </div>
  )
}

export default App
