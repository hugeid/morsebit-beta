def translate(text: str):
    pass

def on_button_pressed_a():
    global msgmorse
    msgmorse = "" + msgmorse + "-"
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    basic.show_string(msgmorse)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global msgmorse
    msgmorse = "" + msgmorse + "."
input.on_button_pressed(Button.B, on_button_pressed_b)

msgmorse = ""
msgtext = ""
radio.set_group(102)
msgmorse = ""
a = "\".-\""

def on_forever():
    pass
basic.forever(on_forever)
