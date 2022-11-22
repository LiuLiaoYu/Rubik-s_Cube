# Rubik-s_Cube

A simulation of Rubik's Cube with face state stored.


| method          | description                                                       |
| --------------- | ----------------------------------------------------------------- |
| rotate(i,dir)   | rotate a face(i in 0~5) clockwise(dir=0) or anti-clockwise(dir=1) |
| face(i)         | return a ndarray of face state where from a part of expansion     |
| vis_expansion() | visualize cube's expansion(by print characters)                   |
| execute(acts)   | parse Rubik's Cube action code and rotate                         |
| shuffle()       | shuffle the cube,return a random sequence of action code          |


future plan:
- Visualize with PySide6 
- A Web Edition