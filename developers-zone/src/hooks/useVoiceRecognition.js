import { useState, useEffect, useCallback } from "react";
import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";



export const useVoiceRecognition = () => {
  const [state, setState] = useState({
    recognized: "",
    pitch: "",
    error: "",
    end: "",
    started: "",
    results: [],
    partialResults: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: "",
      pitch: "",
      error: "",
      started: "",
      results: [],
      partialResults: [],
      end: "",
      isRecording: false,
    });
  }, [setState]);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error('error ==== ',e);
    }
  }, [resetState]);

  const stopRecognizing = useCallback(async () => {
    console.log('stopped //')
    try {
      await Voice.stop();
    } catch (e) {
        console.error('error stop ==== ',e);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const destroyRecognizer = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetState();
  }, [resetState]);

  useEffect(() => {
    Voice.onSpeechStart = (e) => {
        console.log('recording //// ',e)
      setState((prevState) => ({
        ...prevState,
        started: "√",
        isRecording: true,
      }));
    };
    Voice.onSpeechRecognized = () => {
        console.log('recording recog //// ')
      setState((prevState) => ({ ...prevState, recognized: "√" }));
    };
    Voice.onSpeechEnd = (e) => {
        console.log('error end//')
      setState((prevState) => ({ ...prevState, end: "√", isRecording: false }));
    };
    Voice.onSpeechError = (e) => {
        console.log('error //',e)
      setState((prevState) => ({
        ...prevState,
        error: JSON.stringify(e.error),
        isRecording: false,
      }));
    };
    Voice.onSpeechResults = (e) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, results: e.value }));
      }
    };
    Voice.onSpeechPartialResults = (e) => {
        console.log('partial eee ',e)
      if (e.value) {
        setState((prevState) => ({ ...prevState, partialResults: e.value }));
      }
    };
    Voice.onSpeechVolumeChanged = (e) => {
      setState((prevState) => ({ ...prevState, pitch: e.value }));
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizer,
  };
};