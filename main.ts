// to be removed
// 
input.onPinPressed(TouchPin.P0, function () {
    receiver = !(receiver)
    basic.clearScreen()
})
function translate () {
    for (let value of msgmorse) {
        msg = "" + msg + translateletter(value)
    }
}
input.onButtonPressed(Button.A, function () {
    receiver = false
    letter = "" + letter + "."
})
function translateletter (text: string) {
    index = 0
    while (index <= morsealphabet.length - 1) {
        if (morsealphabet[index] == text) {
            return alphabet[index]
        }
        index += 1
    }
    return ""
}
input.onButtonPressed(Button.AB, function () {
    if (!(receiver)) {
        if (letter != "") {
            lettercommit()
        } else {
            translate()
            radio.sendString(msg)
            basic.showIcon(IconNames.Yes)
            basic.pause(1000)
            basic.clearScreen()
            reset()
        }
    }
})
radio.onReceivedString(function (receivedString) {
    if (receiver) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        basic.showString(receivedString)
        msg = receivedString
    }
})
input.onButtonPressed(Button.B, function () {
    receiver = false
    letter = "" + letter + "-"
})
input.onGesture(Gesture.Shake, function () {
    if (receiver) {
        basic.showString(msg)
    } else {
        reset()
    }
})
function reset () {
    letter = ""
    msgmorse = []
    msg = ""
    receiver = true
}
function lettercommit () {
    msg = ""
    msgmorse.push(letter)
    basic.showString("" + (translateletter(letter)))
    letter = ""
}
let index = 0
let morsealphabet: string[] = []
let alphabet: string[] = []
let msgmorse: string[] = []
let msg = ""
let letter = ""
let receiver = false
radio.setGroup(102)
receiver = true
letter = ""
msg = ""
msgmorse = []
alphabet = [
"A",
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
"Z"
]
morsealphabet = [
".-",
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
"--.."
]
basic.forever(function () {
    if (receiver) {
        basic.showLeds(`
            # . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
