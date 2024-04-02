"""
Audio File Conversion
@author Nick Clements
@author Nathan Thomas-Benke

Dependencies:
https://pypi.org/project/AudioConverter/
    - Python installed
    - pip install pydub
    Download ffmpeg
        Windows:
            - https://ffmpeg.org/download.html
            - https://www.wikihow.com/Install-FFmpeg-on-Windows
        Macs:
            - https://pypi.org/project/pydub/#description
            - brew install ffmpeg
            - Download executables (ffmpeg and ffprobe) and add to system path
    - Install pyAudio
"""

#import pydub
#import pydub.playback
from os import path
from pydub import AudioSegment
# files                                                                         
src = "test.mp3"
dst = "SuccessfulConversion.wav"

# convert wav to mp3                                                            
sound = AudioSegment.from_mp3(src)
sound.export(dst, format="wav")



"""
Attempt to playback audio

#Playback audiosample
#a = pydub.AudioSegment.from_mp3('test.mp3')
#pydub.playback.play(a)
"""




#Attempt to convert from mp3 to wav

#from pydub.utils import which
#AudioSegment.converter = which("ffmpeg")

org = 'C:\\Users\\icanh\\Dropbox\\Mellow Curve\\MusicFormatConversion\\MusicFormatConversion\\test.mp3'
newName = "converted.wav"
#sound = AudioSegment.from_file("./test.mp3", format="mp3")

convertedFile = AudioSegment.from_mp3(org)
convertedFile.export(newName, format="wav")




#import soundfile as sf
#y, sr = sf.read('stella.wav')
#print(y.shape, y.dtype, sr)
#sf.write('out.wav', y, sr)
#Read more at https://www.it-jim.com/blog/audio-processing-basics-in-python/


