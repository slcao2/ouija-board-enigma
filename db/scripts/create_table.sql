CREATE TABLE ouija.user (
  user_id INT NOT NULL AUTO_INCREMENT,
  name CHAR(255) NOT NULL,
  picture TEXT,
  PRIMARY KEY (user_id)
);

CREATE TABLE ouija.comment (
  comment_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE ouija.vote (
  vote_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  comment_id INT NOT NULL,
  PRIMARY KEY (vote_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (comment_id) REFERENCES comment(comment_id)
);
