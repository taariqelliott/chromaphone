import * as Tone from "tone";

export const NOTE_NAMES = [
  "C1",
  "C#1",
  "D1",
  "D#1",
  "E1",
  "F1",
  "F#1",
  "G1",
  "G#1",
  "A1",
  "A#1",
  "B1",
  "C2",
  "C#2",
  "D2",
  "D#2",
  "E2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
];

const samples: Record<string, string> = {};
for (let i = 0; i < 25; i++) {
  samples[NOTE_NAMES[i]] = `${i + 1}.wav`;
}

const limiter = new Tone.Limiter(-6).toDestination();

const sampler = new Tone.Sampler({
  urls: samples,
  baseUrl: "/sounds/",
  onload: () => console.log("Synthesizer Ready"),
}).connect(limiter);

export const playSound = async (id: number) => {
  if (Tone.getContext().state !== "running") await Tone.start();
  const noteToPlay = NOTE_NAMES[id - 1];
  sampler.triggerAttackRelease(noteToPlay, "2n");
};
