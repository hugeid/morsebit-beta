def on_pin_pressed_p0():
    global receiver
    receiver = not (receiver)
    basic.clear_screen()
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def on_button_pressed_a():
    global letter
    letter = "" + letter + "."
input.on_button_pressed(Button.A, on_button_pressed_a)

def translateletter(text: str):
    global index
    while index <= len(morsealphabet) - 1:
        if morsealphabet[index] == text:
            return alphabet[index]
        index += 1
    return ""

def on_button_pressed_ab():
    global msg
    if not (receiver):
        if letter != "":
            lettercommit()
        else:
            for value in msgmorse:
                msg = "" + msg + translateletter(value)
            radio.send_string(msg)
            basic.show_icon(IconNames.YES)
            basic.pause(1000)
            basic.clear_screen()
            reset()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global msg
    if receiver:
        music.start_melody(music.built_in_melody(Melodies.BA_DING), MelodyOptions.ONCE)
        basic.show_string(receivedString)
        msg = receivedString
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global letter
    letter = "" + letter + "-"
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    if receiver:
        basic.show_string(msg)
    else:
        reset()
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def reset():
    global letter, msgmorse, msg
    letter = ""
    msgmorse = []
    msg = ""
def lettercommit():
    global letter
    msgmorse.append(letter)
    basic.show_string("" + (translateletter(letter)))
    letter = ""
index = 0
msg = ""
morsealphabet: List[str] = []
alphabet: List[str] = []
msgmorse: List[str] = []
letter = ""
receiver = False
radio.set_group(102)
receiver = False
letter = ""
msgmorse = []
alphabet = ["A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"]
morsealphabet = [".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--.."]
msg = ""

def on_forever():
    if receiver:
        basic.show_leds("""
            # . . . .
                        . . . . .
                        . . . . .
                        . . . . .
                        . . . . .
        """)
basic.forever(on_forever)
