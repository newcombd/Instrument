let osc
let env

let noise
let noise_env


let reverb
let Ears

let slider;

let frequency = 1000.0000

let circle_radius = 0
let circleX = 0
let circleY = 0

let sine = 'true'
let triangle = 'false'
let square = 'false'
let sawtooth = 'false'

let white = 'false'
let brown = 'false'
let pink = 'false'

let A = 0.2
let D = 0.1
let S = 0.1
let R = 0.5

let A2 = 0.1
let D2 = 0.1
let S2 = 0
let R2 = 0

let sax

function preload() {
    sax = new Image("Saxophone.jpg")
}

function setup() {

    let canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent("p5")

        fft = new p5.FFT(); //spectrum setup

        Aslider = createSlider(0, 25, 2);
    Aslider.position(width/25, height/35);
    Aslider.style('Width', '100px');

        Dslider = createSlider(0, 25, 1);
    Dslider.position(width/25, height/12);
    Dslider.style('Width', '100px');

        Sslider = createSlider(0, 25, 1);
    Sslider.position(width/25, height/7.25);
    Sslider.style('Width', '100px');

        Rslider = createSlider(0, 25, 5);
    Rslider.position(width/25, height/5.2);
    Rslider.style('Width', '100px');
    



        A2slider = createSlider(0, 25, 1);
    A2slider.position(width/2.5, height/35);
    A2slider.style('Width', '100px');

        D2slider = createSlider(0, 25, 1);
    D2slider.position(width/2.5, height/12);
    D2slider.style('Width', '100px');

        S2slider = createSlider(0, 25, 0);
    S2slider.position(width/2.5, height/7.25);
    S2slider.style('Width', '100px');

        R2slider = createSlider(0, 25, 0);
    R2slider.position(width/2.5, height/5.2);
    R2slider.style('Width', '100px');





        Earslider = createSlider(-100, 100, 0);
    Earslider.position(width-width/4, height/15);
    Earslider.style('Width', '100px');



    // create new oscillator 
    osc = new p5.Oscillator()
    osc.setType("sine") // "sine" "triangle" square" "sawtooth"
    

    tri = new p5.Oscillator()
    tri.setType("triangle")
    

    sqw = new p5.Oscillator()
    sqw.setType("square")


    saw = new p5.Oscillator()
    saw.setType("sawtooth")


    // create new envelope
    env = new p5.Envelope()
    env.setADSR(A, D, S, R)


    // create new noise maker
    noise = new p5.Noise()
    noise.setType("white") // "brown" "pink"
    noise.amp(0)  // set initial amplitude to 0

    brownNoise = new p5.Noise()
    brownNoise.setType("brown") 
    brownNoise.amp(0)

    pinkNoise = new p5.Noise()
    pinkNoise.setType("pink") 
    pinkNoise.amp(0)

    noise_env = new p5.Envelope()
    noise_env.setADSR(A2, D2, S2, R2)

    reverb = new p5.Reverb()
    //bark.disconnect()
    //reverb.process(bark, 0.5, 2)//.5 = sec reverb, 2 = delay rate

}





function draw() {

    
    let sliderA = Aslider.value();
        A = sliderA/10
    let sliderD = Dslider.value();
        D = sliderD/10
    let sliderS = Sslider.value();
        S = sliderS/10
    let sliderR = Rslider.value();
        R = sliderR/10
    env.setADSR(A, D, S, R)

    let sliderA2 = A2slider.value();
        A2 = sliderA2/10
    let sliderD2 = D2slider.value();
        D2 = sliderD2/10
    let sliderS2 = S2slider.value();
        S2 = sliderS2/10
    let sliderR2 = R2slider.value();
        R2 = sliderR2/10
    noise_env.setADSR(A2, D2, S2, R2)

    let sliderEars = Earslider.value();
        Ears = sliderEars/100
    
    //get the L/R ratio right i guess
    let pan = Ears
    osc.pan(pan)

    noStroke()

    // map the red value of our background fill to the frequency variable

   	fill(0, map(frequency, 50, 2000, 0, 200), 0)//greenscreen
    rect(0, 0, width, height)



    fill(30)
    rect(0, 0, width, height/4)

    rect(0, height-height/8, width, height/4)
    stroke(0)
    line(0, height/4, width, height/4)
    line(width/2, height-height/8, width/2, height)
    line(0, height-height/8, width, height-height/8)

    fill(30)
    stroke(0, 255, 0)
    textSize(30)
        text('A', width/50, height/18)
            text(A, width/6.25, height/18)
        text('D', width/50, height/9.2)
            text(D, width/6.25, height/9.2)
        text('S', width/50, height/6.15)
            text(S, width/6.25, height/6.15)
        text('R', width/50, height/4.6)
    	   text(R, width/6.25, height/4.6)

        text('A', width/2-width/8.5, height/18)
            text(A2, width/2, height/18)
        text('D', width/2-width/8.5, height/9.2)
            text(D2, width/2, height/9.2)
        text('S', width/2-width/8.5, height/6.15)
            text(S2, width/2, height/6.15)
        text('R', width/2-width/8.5, height/4.6)
           text(R2, width/2, height/4.6)


        text('L/R:', width-width/4, height/20)
        
            rect(width-width/8.5, height/90, width/10, height/18)
            text('Reset:', width-width/10, height/20)

        text('Frequency:', width-width/4, height/6)
        text(frequency, width-width/4, height/5)


        stroke(200)
        if (sine == 'true') {fill(50)} else {fill (30)}  
        rect(width/4-width/30, height/50, width/20, width/20) //different sounds-----------------------------------------------

        if (triangle == 'true') {fill(50)} else {fill (30)}
        rect(width/3-width/20, height/50, width/20, width/20)

        if (square == 'true') {fill(50)} else {fill (30)}
        rect(width/4-width/30, height/7.5, width/20, width/20)

        if (sawtooth == 'true') {fill(50)} else {fill (30)}
        rect(width/3-width/20, height/7.5, width/20, width/20)

        if (white == 'true') {fill(50)} else {fill (30)}
        rect(width/3+width/4, height/50, width/20, width/20)

        if (brown == 'true') {fill(50)} else {fill (30)}
        rect(width/3+width/3.15, height/50, width/20, width/20)

        if (pink == 'true') {fill(50)} else {fill (30)}
        rect(width/3+width/4, height/7.5, width/20, width/20)

        fill(30, 130, 30)
        textSize(20)
            text('Sine', width/4-width/45, height/14)
            text('Triangl', width/3-width/21, height/14)
            text('Square', width/4-width/33, height/5.25)
            text('Sawtth', width/3-width/21, height/5.25)
            fill(200)
            text('White', width/3+width/3.9, height/14)
            fill(180, 120, 100)
            text('Brown', width/3+width/3.1, height/14)
            fill(200, 80, 160)
            text('Pink', width/3+width/3.85, height/5.25)




        fill(120)


    

    // make a circle
    
    noFill()
    strokeWeight(1)
    stroke(200)
    ellipse(circleX, circleY, circle_radius, circle_radius)
    if (circle_radius > 0 && mouseIsPressed == false) {
        circle_radius -= 5
    }



    let waveform = fft.waveform(); //waveform at the bottom of the screen------------------------------------------------------
    noFill();
    beginShape();
    stroke(0, 255, 0);
    strokeWeight(1);
        for (var i = 0; i< waveform.length; i++){
        let x = map(i, 0, waveform.length, 0, width/2);
        let y = map( waveform[i], -1, 1, height-height/8, height);
        vertex(x,y);
    }
    endShape();

    let spectrum = fft.analyze(); //spectrum
    noStroke();
    fill(0,255,0); 
    for (var i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, width/2, width);
    let h = -height + map(spectrum[i], 0, 255, height, height-height/8);
    rect(x, height, width / spectrum.length, h );
  }


}



function windowResized() {    
    resizeCanvas(windowWidth, windowHeight)
}





function mousePressed() {

if (mouseY > height/4 && mouseY < height-height/8) {

            // set the circle to the mouse position and increase its radius
        circle_radius = 100
        circleX = mouseX
        circleY = mouseY

        //mouseDragged()
}

	if (mouseY > height/4 && mouseY < height-height/8 && sine == 'true') {
	    // trigger the osc envelope
	    osc.start()
	    osc.amp(env)
	    env.triggerAttack()
	}

    if (mouseY > height/4 && mouseY < height-height/8 && triangle == 'true') {
        tri.start()
        tri.amp(env)
        env.triggerAttack()
    }

    if (mouseY > height/4 && mouseY < height-height/8 && square == 'true') {
        sqw.start()
        sqw.amp(env)
        env.triggerAttack()
    }

    if (mouseY > height/4 && mouseY < height-height/8 && sawtooth == 'true') {
        saw.start()
        saw.amp(env)
        env.triggerAttack()
    }



    if (mouseY > height/4 && mouseY < height-height/8 && white == 'true') { //noise-----------------------------------------

        // trigger the noise envelope
        noise.start()
        noise.amp(noise_env)
        noise_env.triggerAttack()
    }

    if (mouseY > height/4 && mouseY < height-height/8 && brown == 'true') {
        
        brownNoise.start()
        brownNoise.amp(noise_env)
        noise_env.triggerAttack()
       
    }

    if (mouseY > height/4 && mouseY < height-height/8 && pink == 'true') {
        
        pinkNoise.start()
        pinkNoise.amp(noise_env)
        noise_env.triggerAttack()
       
    }


    if (mouseX > width/4-width/30 && mouseY > height/50 && mouseX < width/4-width/30+width/20 && mouseY < height/50+width/20){
        if (sine == 'true') {
           sine = 'false' 
        } else {
           sine = 'true' 
        }
        
    }

    if (mouseX > width/3-width/20 && mouseY > height/50 && mouseX < width/3-width/20+width/20 && mouseY < height/50+width/20){
        if (triangle == 'true') {
           triangle = 'false' 
        } else {
           triangle = 'true' 
        }
    }

    if (mouseX > width/4-width/30 && mouseY > height/7.5 && mouseX < width/4-width/30+width/20 && mouseY < height/7.5+width/20){
        if (square == 'true') {
           square = 'false' 
        } else {
           square = 'true' 
        }
    }

    if (mouseX > width/3-width/20 && mouseY > height/7.5 && mouseX < width/3-width/20+width/20 && mouseY < height/7.5+width/20){
        if (sawtooth == 'true') {
           sawtooth = 'false' 
        } else {
           sawtooth = 'true' 
        }  
    }




    if (mouseX > width/3+width/4 && mouseY > height/50 && mouseX < width/3+width/4+width/20 && mouseY < height/50+width/20){
        if (white == 'true') {
           white = 'false' 
        } else {
           white = 'true' 
        }  
    }

    if (mouseX > width/3+width/3.15 && mouseY > height/50 && mouseX < width/3+width/3.15+width/20 && mouseY < height/50+width/20){
        if (brown == 'true') {
           brown = 'false' 
        } else {
           brown = 'true' 
        }  
    
    }if (mouseX > width/3+width/4 && mouseY > height/7.5 && mouseX < width/3+width/4+width/20 && mouseY < height/7.5+width/20){
        if (pink == 'true') {
           pink = 'false' 
        } else {
           pink = 'true' 
        }  
    }

 




    if (mouseY > height/4 && mouseY < height-height/8) {
    frequency = map(circleY, height/4, height-height/8, 2000, 50)
    osc.freq(frequency) // set the osc to this frequency
    tri.freq(frequency)
    sqw.freq(frequency)
    saw.freq(frequency)
    }

    
 
}



function mouseReleased() {

    // "release" the envelopes
    env.triggerRelease()
    noise_env.triggerRelease()
    // osc.amp(0) //potential fix for the 'sticking' release of the envelopes, but muddles the sound when released
    // tri.amp(0)
    // sqw.amp(0)
    // saw.amp(0)

}



function mouseDragged() {


    // map the mouse position to a frequency variable
    if (mouseY > height/4 && mouseY < height-height/8) {
    frequency = map(circleY, height/4, height-height/8, 2000, 50)
    osc.freq(frequency) // set the osc to this frequency
    tri.freq(frequency)
    sqw.freq(frequency)
    saw.freq(frequency)
    }

    // if (mouseY > height/4 && mouseY < height-height/8) {
    // amplitude = map(mouseX, 0, width, 0, .5) //for some reason amplitude 'sticks' the release of the envelopes.
    // osc.amp(amplitude)
    // tri.amp(amplitude)
    // sqw.amp(amplitude)
    // saw.amp(amplitude)
    // }

    if (mouseY > height/4 && mouseY < height-height/8) {
    
    // track the mouse position with circle variables
    circleX = mouseX
    circleY = mouseY
    }



}



    if (mouseY < height/4 || mouseY > height-height/8) {
    env.triggerRelease()
    noise_env.triggerRelease()
    }


function mouseClicked() {

    if (mouseX > width-width/8.5 && mouseY > height/90 && mouseX < width-width/8.5+width/10 && mouseY < height/90+height/18) {
        sliderA = 2
        A = .2
        sliderD = 1
        D = .1
        sliderS = 1
        S = .1
        sliderR = 5
        R = .5
        sliderEars = 0
        Ears = 0
        frequency = 1000
    }

    if (mouseY > height/4 && mouseY < height-height/8) {
    frequency = map(circleY, height/4, height-height/8, 2000, 50)
    osc.freq(frequency) // set the osc to this frequency
    tri.freq(frequency)
    sqw.freq(frequency)
    saw.freq(frequency)
    }


}

function keyTyped() { //If you want sustain, keyPressed/keyReleased
    print('I typed ' +key )
}


function touchStarted() {
    mousePressed()
    mouseClicked()
}

function touchEnded() {
    mouseReleased()
}


