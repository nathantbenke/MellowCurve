"""
Audio Effects
@author Kyra O'Malley
Dependencies:
    - pip install pedalboard (documentation available at https://github.com/spotify/pedalboard)

This file could also be refactored to just append effects to the same pedalboard
instead of rewriting the file for each effect depending on what we want to do
It can also be changed to edit live audio w AudioStream object instead of AudioFile
"""
from pedalboard import Pedalboard, Compressor, Delay, Distortion, Gain, Reverb
from pedalboard.io import AudioFile


# Dynamic range compressor that reduces volume of loud sounds
def compressor(input_file, output_file):
    board = Pedalboard([Compressor()])
    # Open an audio file for reading:
    with AudioFile(input_file) as f:
        # Open an audio file to write to:
        with AudioFile(output_file, 'w', f.samplerate, f.num_channels) as o:
            # Read one second of audio at a time, until the file is empty:
            while f.tell() < f.frames:
                chunk = f.read(int(f.samplerate))
                # Run the audio through our pedalboard:
                effected = board(chunk, f.samplerate, reset=False)
                # Write the output to our output file:
                o.write(effected)


# Applies a .5 second delay with equal dry/wet mix and 0% feedback (can change these to be set by user)
def delay(input_file, output_file):
    board = Pedalboard([Delay()])
    # Open an audio file for reading:
    with AudioFile(input_file) as f:
        # Open an audio file to write to:
        with AudioFile(output_file, 'w', f.samplerate, f.num_channels) as o:
            # Read one second of audio at a time, until the file is empty:
            while f.tell() < f.frames:
                chunk = f.read(int(f.samplerate))
                # Run the audio through our pedalboard:
                effected = board(chunk, f.samplerate, reset=False)
                # Write the output to our output file:
                o.write(effected)


# Applies a nonlinear distortion function to audio
def distortion(input_file, output_file):
    board = Pedalboard([Distortion()])
    # Open an audio file for reading:
    with AudioFile(input_file) as f:
        # Open an audio file to write to:
        with AudioFile(output_file, 'w', f.samplerate, f.num_channels) as o:
            # Read one second of audio at a time, until the file is empty:
            while f.tell() < f.frames:
                chunk = f.read(int(f.samplerate))
                # Run the audio through our pedalboard:
                effected = board(chunk, f.samplerate, reset=False)
                # Write the output to our output file:
                o.write(effected)


# Makes the audio 10 decibels louder
def increase_vol(input_file, output_file):
    board = Pedalboard([Gain(gain_db=10)])
    # Open an audio file for reading:
    with AudioFile(input_file) as f:
        # Open an audio file to write to:
        with AudioFile(output_file, 'w', f.samplerate, f.num_channels) as o:
            # Read one second of audio at a time, until the file is empty:
            while f.tell() < f.frames:
                chunk = f.read(int(f.samplerate))
                # Run the audio through our pedalboard:
                effected = board(chunk, f.samplerate, reset=False)
                # Write the output to our output file:
                o.write(effected)


# Makes the audio 10 decibels softer
def reduce_vol(input_file, output_file):
    board = Pedalboard([Gain(gain_db=-10)])
    # Open an audio file for reading:
    with AudioFile(input_file) as f:
        # Open an audio file to write to:
        with AudioFile(output_file, 'w', f.samplerate, f.num_channels) as o:
            # Read one second of audio at a time, until the file is empty:
            while f.tell() < f.frames:
                chunk = f.read(int(f.samplerate))
                # Run the audio through our pedalboard:
                effected = board(chunk, f.samplerate, reset=False)
                # Write the output to our output file:
                o.write(effected)

# OR would it be better to just have an adjust_vol with desired db?


# Adds reverb to audio
def reverb(input_file, output_file):
    board = Pedalboard([Reverb()])
    # Open an audio file for reading:
    with AudioFile(input_file) as f:
        # Open an audio file to write to:
        with AudioFile(output_file, 'w', f.samplerate, f.num_channels) as o:
            # Read one second of audio at a time, until the file is empty:
            while f.tell() < f.frames:
                chunk = f.read(int(f.samplerate))
                # Run the audio through our pedalboard:
                effected = board(chunk, f.samplerate, reset=False)
                # Write the output to our output file:
                o.write(effected)


# TESTS
input_file = 'MusicFormatConversion_female_singer.wav'
reverb_output = 'reverb_singer.wav'
delay_output = 'delay_singer.wav'
distortion_output = 'distortion_singer.wav'
compressor_output = 'compressor_singer.wav'
reduce_vol_output = 'reduce_vol_singer.wav'
increase_vol_output = 'increase_vol_singer.wav'

reverb(input_file, reverb_output)
delay(input_file, delay_output)
distortion(input_file, distortion_output)
compressor(input_file, compressor_output)
reduce_vol(input_file, reduce_vol_output)
increase_vol(input_file, increase_vol_output)