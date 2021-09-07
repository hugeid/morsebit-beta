input.onPinPressed(TouchPin.P0, function () {
    receiver = !(receiver)
})
function translateletter (text: string) {
    for (let index = 0; index <= morsealphabet.length - 1; index++) {
        if (morsealphabet[index] == text) {
            return alphabet[index]
        }
    }
    return ""
}
function lettercommit () {
    msgmorse.push(letter)
    letter = ""
}
input.onButtonPressed(Button.A, function () {
    letter = "" + letter + "."
})
input.onButtonPressed(Button.AB, function () {
    if (letter != "") {
        lettercommit()
    } else {
        for (let value of msgmorse) {
            msg = "" + msg + translateletter(value)
        }
        if (!(receiver)) {
            radio.sendString("" + (msg))
        }
        reset()
    }
})
radio.onReceivedString(function (receivedString) {
    if (receiver) {
        basic.showString(receivedString)
        msg = receivedString
    }
})
input.onButtonPressed(Button.B, function () {
    letter = "" + letter + "-"
})
input.onGesture(Gesture.Shake, function () {
    if (receiver) {
        basic.showString("" + (msg))
    } else {
        reset()
    }
})
function reset () {
    letter = ""
    msgmorse = []
    msg = ""
}
let msg = ""
let morsealphabet: string[] = []
let alphabet: string[] = []
let msgmorse: string[] = []
let letter = ""
let receiver = false
radio.setGroup(102)
receiver = true
letter = ""
msgmorse = []
alphabet = ["A", "B", "C"]
morsealphabet = [".-", "-...", "-.-."]
msg = ""
basic.forever(function () {
    if (receiver) {
        basic.showLeds(`
            # . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else {
        basic.clearScreen()
    }
})
