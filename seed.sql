SET
  NAMES utf8mb4;

DROP TABLE IF EXISTS talkers;

CREATE TABLE
  talkers (
    name VARCHAR(512),
    age INT,
    id INT PRIMARY KEY AUTO_INCREMENT,
    talk_watched_at VARCHAR(512),
    talk_rate INT
  );

INSERT INTO
  talkers (id, name, age, talk_watched_at, talk_rate)
VALUES (1, 'Henrique Albuquerque', 62, '22/10/2020', 5),
  (2, 'Heloísa Albuquerque', 67, '22/10/2020', 4),
  (3, 'Ricardo Xavier Filho', 33, '22/10/2020', 3),
  (4, 'Marcos Costa', 24, '30/10/2020', 5),
  (5, 'Henrique dos Santos', 44, '29/10/2020', 5);
