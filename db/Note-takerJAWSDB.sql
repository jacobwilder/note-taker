CREATE TABLE notes
(
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

USE note_db;

INSERT INTO notes (title, text)
VALUES
  ("Get Gas", "Remember to get gas on your way home!"),
  ("Pick up firewood", "Hosting bonfire on Friday, November 1st, 7:00 P.M"),
  ("Mark myself present in Bootcampspot", "Remember to mark myself present every Monday-Friday at 10am"),
  ("Commit more", "Get those commits up. It shows the process and progress."),
  ("Study for Project 2", "Project 2 platformer game WIP/Remember to study!");

SELECT * FROM notes;