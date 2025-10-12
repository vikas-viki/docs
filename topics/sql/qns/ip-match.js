let query= `
select 
    ip, 
    count(ip) as invalid_count
from logs
where 
    not regexp_like(ip, "^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:[.](?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$")
group by ip
order by invalid_count desc, ip desc;
`

// an ip no can be b/w 1 to 255
// the regex calculates like this
// [1-9] meanse any single charachter that's between 1 to 9
// | ssignifies 1 character match, if its matching move to next set (after '.')
// same way (for ex we have 123.1.23.234)
// [1-9]| => 1 to 9, 1 char
// [1-9][0-9]| => 10 to 99, two char
// 1[0-9][0-9]| => 100 to 199, 3 char
// 2[0-4][0-9] => 200 to 249, 3 char
// 25[0-5] => 250 to 255, 3 char.


// you may ask wny not just do from 200-255, then you'll write as `2[0-5][0-5]`
// in this case the third characrer can only be between 0 to 5, hence you miss 6,7,8,9 (216, 217, 237...)
// so we divide it to two parts, so that everything is matched.

// after that, we add another part that repeats itself 3 times along with matching . in the start

//^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]) (?:[.](?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$


// ^ signifies the start
// $ signifies the end

// email match
`
# Write your MySQL query statement below
select
    user_id,
    name,
    mail
from users
where
    regexp_like(mail, '^[A-Za-z](?:[A-Za-z0-9._-]*)@leetcode\\.com$', 'c');
`