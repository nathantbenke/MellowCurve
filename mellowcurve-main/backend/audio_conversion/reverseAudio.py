import pyaudio
import wave

##WIP##

soundFile = 'test.wav'
wf = wave.open(soundFile, 'rb')

p = pyaudio.PyAudio()
stream = p.open(format =
                p.get_format_from_width(wf.getsampwidth()),
                channels = wf.getnchannels(),
                rate = wf.getframerate(),
                output = True)

fullTransform = []
transform = wf.readframes(1024)

while (transform) :
    fullTransform.append(transform)
    transform = wf.readframes(1024)

transform = ''.join(fullTransform)[::-1]

for i in range (0, len(transform),1024):
    stream.write(data[i:i+1024])


##https://nerdparadise.com/programming/pythonwave
def reverse(audio):
    sound = create_sound_from_file(audio)
    sound.samples[0] = sound.samples[0][::-1] ##Reverse Mono
    sound.samples[1] = sound.samples[1][::-1] ##Reverse Stereo