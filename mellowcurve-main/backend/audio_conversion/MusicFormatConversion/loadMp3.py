"""
Pydub - Manipulate audio with a simple and easy high level interface

@Author Nathan Thomas-Benke

(1) Install ffmpeg 
	APPLE - brew intall ffmpeg
(2) Install pyDub - pip install pydub


https://www.geeksforgeeks.org/how-to-get-the-duration-of-audio-in-python/
"""

from pydub import AudioSegment

audio = AudioSegment.from_wav("C:\\Users\\natha\\Dropbox\\Mellow Curve\\MusicFormatConversion\\MusicFormatConversion\\female_singer.wav")

# increase volume by 6 decibals (dB)
audio = audio + 6

# repeats clip
audio = audio * 2

# Fade audio in (2000 milliseconds or 2 seconds)
audio = audio.fade_in(2000)

# Export audio
audio.export("mashup.mp3", format="mp3")
audio2 = AudioSegment.from_mp3("C:\\Users\\natha\\Dropbox\\Mellow Curve\\MusicFormatConversion\\mashup.mp3")
print("Successfully Converted!")

audio.export("mashup.aiff", format="aiff")
audio3 = AudioSegment.from_file("C:\\Users\\natha\\Dropbox\\Mellow Curve\\MusicFormatConversion\\mashup.aiff", format="aiff")


## TODO: Properly convert .mp3 to wav.

## TODO: Properly convert .mp3 to wav.