"""
Pydub - Manipulate audio with a simple and easy high level interface

@Author Nathan Thomas-Benke

(1) Install ffmpeg 
	APPLE - brew intall ffmpeg
(2) Install pyDub - pip instal pydub

"""

from pydub import AudioSegment

audio = AudioSegment.from_wav("C:\\Users\\icanh\\Dropbox\\Mellow Curve\\MusicFormatConversion\\MusicFormatConversion\\female_singer.wav")

#increase volume by 6 decibals (dB)
audio = audio + 6

#repeats clip
audio = audio * 2

#Fade audio in (2000 milliseconds or 2 seconds)
audio = audio.fade_in(2000)

#Export audio
audio.export("mashup.mp3", format="mp3")


audio2 = AudioSegment.from_mp3("C:\\Users\\icanh\\Dropbox\\Mellow Curve\\MusicFormatConversion\\mashup.mp3")
print("Successfully Converted!")
