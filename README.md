# Red Lights Simulator

This is a traffic simulator based on a Finite State Machine (DFA) in Theory of Computation. It is 
assuming a  crossing which consists of a main street (like a highway) and a side street.

These 2 streets are perpendicular to each other and the traffic running on teh main street is given priority.

There are several attributes to this system:

__Main Street Minimum Run Time (T<sub>m</sub>)__ This is the minimum time for which the traffic
light will remain green in the main street.

__Side Street Minimum Run Time (T<sub>s</sub>)__ This is the minimum time for which the side street
traffic light will remain green provided there ae cars in teh side street. If there are no cars in the side street
the traffic light will not remain green. 

This is different than the main street, as there the light will remain green even if there 
are no cars.

__Crossing Time (T<sub>c</sub>)__ This is the time taken by any car (either in the main street
or the side street) to cross the crossing when the light is green for them.

__Wait Time (T<sub>w</sub>)__ This is the time taken by the traffic light to turn green from 
yellow. 

## Running on the Browser
The project is deployed [here](https://red-light-automata-simulator.firebaseapp.com/simulator)

## Running the Project on you machine

```bash
git cone https://github.com/anishLearnsToCode/red-light-automata-simulator.git
cd red-light-automata-simulator
ng serve
```

This will it run it locally on your machine on [port 4200](http://localhost:4200/)
