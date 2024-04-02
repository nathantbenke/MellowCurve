"""
Resources: https://www.youtube.com/watch?v=n2FKsPt83_A
@author Nathan Thomas-Benke
@author Nick Clements

This projects is for working with .wav files
Shows how to print various pieces of information about the sample audio clip and then creates a new audio clip with altered bit information
"""

# Audio file formats
# .mp3
# .flac
# .wav


#Allows you to work with .wav files without any excess downloads
import wave
obj = wave.open("C:\\Users\\natha\\Dropbox\\Mellow Curve\\MusicFormatConversion\\MusicFormatConversion\\female_singer.wav", "rb")

print("Number of channels", obj.getnchannels())
print("sample width", obj.getsampwidth())
print("frame rate", obj.getframerate())
print("Number of frames", obj.getnframes())
print("parameters",obj.getparams())

t_audio = obj.getnframes() / obj.getframerate()
print(t_audio)

frames = obj.readframes(-1)
print(type(frames), type(frames[0]))
print(len(frames) / 2)



#Generates a new .wav file that is Slowed and Pitched Down
obj_new = wave.open("C:\\Users\\natha\\Dropbox\\Mellow Curve\\MusicFormatConversion\\MusicFormatConversion\\female_singer_new.wav", "wb")
obj_new.setnchannels(1)
obj_new.setsampwidth(2)
obj_new.setframerate(16000.0)

obj_new.writeframes(frames)

obj_new.close()



##https://thecleverprogrammer.com/2020/07/22/audio-processing-with-python/
##BASIC AUDIO PROCESSING##

# Repeat 2 times
loop2 = loop * 2
# Get length in milliseconds
length = len(loop2)
# Set fade time
fade_time = int(length * 0.5)
# Fade in and out
faded = loop2.fade_in(fade_time).fade_out(fade_time)

## LAYERING AUDIO ##

# Download another loop
urllib.request.urlretrieve("https://tinyurl.com/yx3k5kw5", "beat.wav")
# Load into PyDub
beat = AudioSegment.from_wav("beat.wav")
# Mix with our original loop
mixed = beat[:length].overlay(loop2)
