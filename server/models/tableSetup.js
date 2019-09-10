import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => {
  console.log(err);
});

const createTables = pool.query(`DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    bio VARCHAR NOT NULL,
    occupation VARCHAR NOT NULL,
    expertise VARCHAR NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    is_mentor BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO users (
    first_name, last_name, email, password, address, bio, occupation, expertise, is_admin, is_mentor) 
    VALUES (
        'KIREZI',
        'Herve',
        'herve1@gmail.com',
        '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
        'Kigali,Rwanda',
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        'Lorem Ipsum is simply dummy text',
        'Lorem Ipsum is simply dummy text',
        true,
        false
        ),
        (
            'KAGABO',
            'Ivan',
            'herve2@gmail.com',
            '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
            'Nairobi,Kenya',
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            'Lorem Ipsum is simply dummy text',
            'Lorem Ipsum is simply dummy text',
            false,
            true
            ),
            (
                'CYUZUZO',
                'Emery',
                'herve3@gmail.com',
                '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
                'Kampala,Uganda',
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                'Lorem Ipsum is simply dummy text',
                'Lorem Ipsum is simply dummy text',
                false,
                false
                ),
                (
                    'KARANGWA',
                    'Vicky',
                    'herve4@gmail.com',
                    '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
                    'Kampala,Uganda',
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                    'Lorem Ipsum is simply dummy text',
                    'Lorem Ipsum is simply dummy text',
                    false,
                    true
                    ),
                    (
                        'TUYISENGE',
                        'Sylvain',
                        'herve5@gmail.com',
                        '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
                        'Daarslum,Tanzania',
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                        'Lorem Ipsum is simply dummy text',
                        'Lorem Ipsum is simply dummy text',
                        false,
                        true
                        ),
                        (
                            'HAKORIMANA',
                            'Emmy',
                            'herve6@gmail.com',
                            '$2b$10$nhZCvSMTdKg/MI7gVTWwj.WCeq7tTSpr4xj4xzVmIbdCoHnwj9nwy',
                            'Canada,US',
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
                            'Lorem Ipsum is simply dummy text',
                            'Lorem Ipsum is simply dummy text',
                            false,
                            true
                            );
                    

DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions(
    id SERIAL NOT NULL PRIMARY KEY,
    mentor_id SERIAL NOT NULL,
    mentee_id SERIAL NOT NULL,
    mentee_email VARCHAR NOT NULL,
    questions VARCHAR NOT NULL,
    status VARCHAR NOT NULL
); 
INSERT INTO sessions (mentor_id, mentee_id, mentee_email, questions, status)
   VALUES (
        2,
        1,
       'herve2@gmail.com',
       'Just for test',
       'pending'
      ),
      (
        4,
        2,
       'herve4@gmail.com',
       'Just for test',
       'accepted'
      ),
      (
        5,
        3,
       'herve5@gmail.com',
       'Just for test',
       'rejected'
      ),
      (
        5,
        3,
       'herve5@gmail.com',
       'Just for test',
       'pending'
      );

`);

export default createTables;
