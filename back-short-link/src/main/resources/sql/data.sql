-- Вставка тестовых данных в таблицу category
INSERT INTO category (title)
VALUES ('Technology'),
       ('Science'),
       ('Arts');

-- Вставка тестовых данных в таблицу links
INSERT INTO links (link_name, short_link, long_link, create_date, last_modified_date, remove_date, id_category, id_user)
VALUES ('Google', 'G123456', 'https://www.google.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('StackOverflow', 'S123456', 'https://stackoverflow.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Wikipedia', 'W123456', 'https://www.wikipedia.org', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('GitHub', 'G234567', 'https://github.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36);