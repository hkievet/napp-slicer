import {
  Box,
  Button,
  ButtonGroup,
  Center,
  ChakraProvider,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import "./App.css";
import TimeDisplay from "./TimeDisplay";
import useInterval from "./useInterval";

const SAMPLE_SONG_URL = "http://localhost:3333/static/question_mark.wav";

interface AppState {
  currentTime: number | undefined;
}

function App() {
  const [state, setState] = React.useState<AppState>({
    currentTime: undefined,
  });
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioRef]);

  useInterval(() => {
    if (!audioRef?.current?.paused) {
      setState({ currentTime: audioRef?.current?.currentTime });
    }
  }, 100);

  function play() {
    audioRef.current && audioRef.current.play();
  }

  function pause() {
    audioRef.current && audioRef.current.pause();
  }

  function moveAudio(percent: number | undefined) {
    const audio = audioRef.current;
    if (audio && percent) {
      audio.pause();
      const { duration } = audio;
      const newTime = (percent / 100) * duration;
      audio.currentTime = newTime;
    }
  }

  let currentPercentageDone = 0;
  if (audioRef.current) {
    currentPercentageDone =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
  }

  return (
    <ChakraProvider>
      <Center mt={10}>
        <Box>
          <Text as="h1" fontSize="xl" mb={6}>
            Custom music controls app
          </Text>
          <Text as="p" mb={3}>
            {SAMPLE_SONG_URL}
          </Text>
          <Box>
            <audio ref={audioRef as any} src={SAMPLE_SONG_URL}></audio>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={30}
              value={currentPercentageDone}
              onMouseDown={pause}
              onChange={(v) => {
                moveAudio(v);
                setState({ currentTime: v });
              }}
              mb={4}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mb={4}>
              <TimeDisplay seconds={audioRef?.current?.currentTime || 0} /> of{" "}
              <TimeDisplay seconds={audioRef?.current?.duration || 0} />
            </Text>
            <ButtonGroup>
              <Button onClick={pause}>Pause</Button>
              <Button onClick={play}>Play</Button>
            </ButtonGroup>
            <Box width="300px" mt={5}>
              <Text fontSize={"large"}>Diagnostics</Text>
              <Text>State.currentTime: {state?.currentTime}</Text>
              <Text>Current Time: {audioRef?.current?.currentTime}</Text>
              <Text>Duration: {audioRef?.current?.duration}</Text>
            </Box>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
