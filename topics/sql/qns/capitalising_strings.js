let query = `
WITH RECURSIVE split_words AS (
    -- Start: take full text as "rest", empty as "word"
    SELECT 
        content_id,
        content_text,
        TRIM(SUBSTRING_INDEX(content_text, ' ', 1)) AS word,
        TRIM(SUBSTRING(content_text, LENGTH(SUBSTRING_INDEX(content_text, ' ', 1)) + 2)) AS rest,
        1 AS pos
    FROM user_content

    UNION ALL

    -- Recursively extract next words
    SELECT 
        content_id,
        content_text,
        TRIM(SUBSTRING_INDEX(rest, ' ', 1)) AS word,
        TRIM(SUBSTRING(rest, LENGTH(SUBSTRING_INDEX(rest, ' ', 1)) + 2)) AS rest,
        pos + 1
    FROM split_words
    WHERE rest <> ''
),

transformed AS (
    SELECT 
        content_id,
        content_text,
        pos,
        CASE 
            -- Hyphenated words
            WHEN LOCATE('-', word) > 0 THEN CONCAT(
                UPPER(LEFT(SUBSTRING_INDEX(word, '-', 1), 1)),
                LOWER(SUBSTRING(SUBSTRING_INDEX(word, '-', 1), 2)),
                '-',
                UPPER(LEFT(SUBSTRING_INDEX(word, '-', -1), 1)),
                LOWER(SUBSTRING(SUBSTRING_INDEX(word, '-', -1), 2))
            )
            -- Normal words
            ELSE CONCAT(
                UPPER(LEFT(word, 1)),
                LOWER(SUBSTRING(word, 2))
            )
        END AS modified_word
    FROM split_words
)

SELECT 
    content_id,
    content_text as original_text,
    TRIM(GROUP_CONCAT(modified_word ORDER BY pos SEPARATOR ' ')) AS converted_text
FROM transformed
GROUP BY content_id, content_text;
`;

// here pos is column name

// here we first divide each sentence into seperate words, each having a tag info of position, 
// then we transform each word again, then we group and join them together based on position and content_id;
// group_concat concatenates the words by having ' ' seperator and ordering based on the position earlier