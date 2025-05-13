-- Get all capitals and high scores
SELECT  * FROM  capitals;
SELECT * FROM high_scores;

-- Backup the capitals table
CREATE TABLE capitals_backup AS SELECT * FROM capitals;

-- Remove empty or null capitals from backup
DELETE FROM capitals_backup
WHERE capital IS NULL OR TRIM(capital) = '';

-- View cleaned backup
SELECT  * FROM  capitals_backup;

-- 1. Create a clean new table with proper IDs
CREATE TABLE clean_capitals AS
SELECT ROW_NUMBER() OVER () AS id, country, capital
FROM capitals_backup;

-- Drop the temporary backup
DROP TABLE capitals_backup;

-- View clean table
SELECT * FROM clean_capitals;

-- Rename tables: keep original as backup, and replace with cleaned version
ALTER TABLE capitals RENAME TO original_capitals;
ALTER TABLE clean_capitals RENAME TO capitals;

-- Double check
SELECT * FROM original_capitals;
SELECT * FROM capitals;

-- Create a new easy-level capitals table
CREATE TABLE capitals_easy (
  id SERIAL PRIMARY KEY,
  country VARCHAR(100),
  capital VARCHAR(100)
);

-- Insert a selection of easy capitals based on id
INSERT INTO capitals_easy (country, capital)
SELECT country, capital
FROM capitals
WHERE id IN (1,3,4,6,7,10,11,13,14,15,16,17,19,20,23,25,
27,29,32,36,37,40,42,43,46,48,50,52,53,55,56,57,58,61,63,
64,65,68,69,72,73,74,78,80,81,82,83,84,85,89,91,95,97,98,
99,100,101,102,103,104,105,106,107,109,110,111,114,115,117,
118,120,121,122,123,124,126,128,129,131,138,140,141,142,
143,145,146,147,148,150,151,153,155,156,159,162,163,164,
167,168,169,170,171,173,174,175,176,178,179,188,189,191,
192,193,198,199,201,202,204,206,207,208,212,213,214,215,
216,217,218,223,224,225,228,229,230,231,232,233,234,236,
237,238,243,244,245);

-- Check inserted easy capitals
SELECT * FROM capitals_easy;

-- Add difficulty column to high scores table
ALTER TABLE high_scores ADD COLUMN difficulty VARCHAR(10);

-- Add unique constraint for username and difficulty combo
ALTER TABLE high_scores DROP CONSTRAINT high_scores_username_key;
ALTER TABLE high_scores ADD CONSTRAINT unique_user_difficulty UNIQUE (username, difficulty);

-- Review the high scores
SELECT * FROM high_scores;

-- Reset high scores table
TRUNCATE TABLE high_scores RESTART IDENTITY;

-- Rename back if needed
ALTER TABLE capitals_easy RENAME TO capitals_normal;
ALTER TABLE capitals_normal RENAME TO capitals_easy;