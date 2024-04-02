from pydub import AudioSegment


# Takes an audio file in mp3 or wav format and converts it to the format
# specified in newName.
#   @Param file     The path to the file to be converted
#   @Param newName  The name of the converted file (including extension)
def convert(file, newName):
    # Parse for file extension
    indexFrom = file.rindex('.')
    fileExt = file[indexFrom:]

    # Parse for newName extension
    indexTo = newName.rindex('.')
    newExt = newName[indexTo:]

    # Create audio segment from the file's format
    if fileExt == ".mp3":
        convertedFile = AudioSegment.from_mp3(file)
    if fileExt == ".wav":
        convertedFile = AudioSegment.from_wav(file)

    # Export based on format specified in newName
    if newExt == ".mp3":
        convertedFile.export(newName, format="mp3")
    if newExt == ".wav":
        convertedFile.export(newName, format="wav")

    return


# This function splices a new audio clip from the given segment
#   @Param audioSegment  The segment to change volume
#   @Param val           Num dB to raise of lower volume by
#   @Return newSegment   The volume-adjusted segment
def changeDb(audioSegment, val):
    if val > 0:  # Raise volume
        newSegment = audioSegment + val
    if val < 0:  # Lower volume
        newSegment = audioSegment - val

    return newSegment


# This function splices a new audio clip from the given segment
#   @Param audioSegment  The segment to splice
#   @Param start         Num seconds into audioSegment to start new clip
#   @Param end           Num seconds into audioSegment to end new clip
#   @Return newSegment   The spliced segment
def splice(audioSegment, start, end):
    # Convert seconds to milliseconds
    start *= 1000
    end *= 1000

    newSegment = audioSegment[start:end]

    return newSegment


# This function takes an ordered list of AudioSegments and combines them
#   @Param segments     The list of audio segments to merge
#   @Return newSegment  The merged segment
def merge(segments):
    # Initialize newSegment
    newSegment = None

    # Concat each segment to end of newSegment
    for audioSegment in segments:
        newSegment += audioSegment

    return newSegment
