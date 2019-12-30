// Player functions

const instrument = mpe()

// Functions

const decodeMidi = (msg) => {
  let act = ""
  let mod1 = "";
  let mod2 = "";

  if (msg[0] >= 128 && msg[0] <= 143) {
    //Note off
    act = "note_off"
    mod1 = ['Note', msg[1]]
    mod2 = ['Velocity', msg[2]]
  } else if (msg[0] >= 144 && msg[0] <= 159) {
    //Note on
    act = "note_on"
    mod1 = ['Note', msg[2]]
    mod2 = ['Velocity', msg[1]]
  } else if (msg[0] >= 160 && msg[0] <= 175) {
    //Polyphonic Aftertouch
    act = "polyphonic_aftertouch"
    mod1 = ['Note', msg[1]]
    mod2 = ['Pressure', msg[2]]
  } else if (msg[0] >= 176 && msg[0] <= 191) {
    //Control/Mode chnage
    act = "mode_change"
    mod1 = ['Mode', msg[1]]
    mod2 = ['Mode', msg[2]]
  } else if (msg[0] >= 192 && msg[0] <= 207) {
    //Program Change
    act = "program_change"
    mod1 = ['Program', msg[1]]
    mod2 = ['None']
  } else if (msg[0] >= 208 && msg[0] <= 223) {
    //Channel Aftertouch
    act = "channel_aftertouch"
    mod1 = ['Pressure', msg[1]]
    mod2 = ['None']
  } else if (msg[0] >= 224 && msg[0] <= 239) {
    //Pitch Wheel Range
    act = "pitch_wheel_range"
    mod1 = ['least_significant', msg[1]]
    mod2 = ['most_significant', msg[2]]
  } else {
    act = msg[0]
    mod1 = msg[1]
  }


  return [act, mod1, mod2]
}


// Notes
/* 
      C    C#	  D	    Eb     E	  F	    F#	  G	    G#	   A	  Bb	  B
0	16.35	17.32	18.35	19.45	20.60	21.83	23.12	24.50	25.96	27.50	29.14	30.87
1	32.70	34.65	36.71	38.89	41.20	43.65	46.25	49.00	51.91	55.00	58.27	61.74
2	65.41	69.30	73.42	77.78	82.41	87.31	92.50	98.00	103.8	110.0	116.5	123.5
3	130.8	138.6	146.8	155.6	164.8	174.6	185.0	196.0	207.7	220.0	233.1	246.9
4	261.6	277.2	293.7	311.1	329.6	349.2	370.0	392.0	415.3	440.0	466.2	493.9
5	523.3	554.4	587.3	622.3	659.3	698.5	740.0	784.0	830.6	880.0	932.3	987.8
6	1047	1109	1175	1245	1319	1397	1480	1568	1661	1760	1865	1976
7	2093	2217	2349	2489	2637	2794	2960	3136	3322	3520	3729	3951
8	4186	4435	4699	4978	5274	5588	5920	6272	6645	7040	7459	7902 */

const note_freq = {
  "C": {
    "0": "16.35",
    "1": "32.70",
    "2": "65.41",
    "3": "130.8",
    "4": "261.6",
    "5": "523.3",
    "6": "1047",
    "7": "2093",
    "8": "4186"
  },
  "C#": {
    "0": "17.32",
    "1": "34.65",
    "2": "69.30",
    "3": "138.6",
    "4": "277.2",
    "5": "554.4",
    "6": "1109",
    "7": "2217",
    "8": "4435"
  },
  "D": {
    "0": "18.35",
    "1": "36.71",
    "2": "73.42",
    "3": "146.8",
    "4": "293.7",
    "5": "587.3",
    "6": "1175",
    "7": "2349",
    "8": "4699"
  },
  "Eb": {
    "0": "19.45",
    "1": "38.89",
    "2": "77.78",
    "3": "155.6",
    "4": "311.1",
    "5": "622.3",
    "6": "1245",
    "7": "2489",
    "8": "4978"
  },
  "E": {
    "0": "20.60",
    "1": "41.20",
    "2": "82.41",
    "3": "164.8",
    "4": "329.6",
    "5": "659.3",
    "6": "1319",
    "7": "2637",
    "8": "5274"
  },
  "F": {
    "0": "21.83",
    "1": "43.65",
    "2": "87.31",
    "3": "174.6",
    "4": "349.2",
    "5": "698.5",
    "6": "1397",
    "7": "2794",
    "8": "5588"
  },
  "F#": {
    "0": "23.12",
    "1": "46.25",
    "2": "92.50",
    "3": "185.0",
    "4": "370.0",
    "5": "740.0",
    "6": "1480",
    "7": "2960",
    "8": "5920"
  },
  "G": {
    "0": "24.50",
    "1": "49.00",
    "2": "98.00",
    "3": "196.0",
    "4": "392.0",
    "5": "784.0",
    "6": "1568",
    "7": "3136",
    "8": "6272"
  },
  "G#": {
    "0": "25.96",
    "1": "51.91",
    "2": "103.8",
    "3": "207.7",
    "4": "415.3",
    "5": "830.6",
    "6": "1661",
    "7": "3322",
    "8": "6645"
  },
  "A": {
    "0": "27.50",
    "1": "55.00",
    "2": "110.0",
    "3": "220.0",
    "4": "440.0",
    "5": "880.0",
    "6": "1760",
    "7": "3520",
    "8": "6645"
  },
  "Bb": {
    "0": "29.14",
    "1": "58.27",
    "2": "116.5",
    "3": "233.1",
    "4": "466.2",
    "5": "932.3",
    "6": "1865",
    "7": "3729",
    "8": "7459"
  },
  "B": {
    "0": "30.87",
    "1": "61.74",
    "2": "123.5",
    "3": "246.9",
    "4": "493.9",
    "5": "987.8",
    "6": "1976",
    "7": "3951",
    "8": "7902"
  }
}
const notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"]
var notes_played = new Map()
var mode = "sine"

const main = () => {
  var context = new AudioContext()
  navigator.requestMIDIAccess().then(access => {
    // Iterate over the list of inputs returned
    access.inputs.forEach(midiInput => {
      // Send 'midimessage' events to the mpe.js `instrument` instance
      midiInput.addEventListener(
        'midimessage',
        (event) => {
          instrument.processMidiMessage(event.data);
          let data = decodeMidi(event.data);
          let id = instrument.activeNotes()

          console.log(data)



          try {
            let note = (notes[(event.data[1] % 12)])

            if (data[0] == "note_on") {
              if (notes_played.has(`${note}-${event.data[1]}`) == false) {
                //create key
                console.log(` start ${note}-${event.data[1]}`)

                let o = context.createOscillator()
                o.type = mode
                o.frequency.value = parseFloat(note_freq[note][parseInt((event.data[1] / 12)) - 1])


                notes_played.set(`${note}-${event.data[1]}`, o)

                //turn on

                o.connect(context.destination)
                o.start(0)
              }
            }

            if (data[0] == "note_off") {
              console.log(notes_played)
              console.log(` stop ${note}-${event.data[1]}`)
              if (notes_played.has(`${note}-${event.data[1]}`)) {
                //turn off
                notes_played.get(`${note}-${event.data[1]}`).stop()
                //delete key
                notes_played.delete(`${note}-${event.data[1]}`)

              }
            }
          } catch (e) {

            console.log(e)
          }
        }

      );
    });
  });
}



