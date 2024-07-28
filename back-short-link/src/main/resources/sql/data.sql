-- Вставка тестовых данных в таблицу category
INSERT INTO category (title)
VALUES ('Technology'),
       ('Science'),
       ('Arts');

INSERT INTO category (title)
VALUES ('Health'),
       ('Sports'),
       ('Education'),
       ('Travel'),
       ('Food'),
       ('Business'),
       ('Finance'),
       ('Entertainment'),
       ('Music'),
       ('Movies'),
       ('Literature'),
       ('Fashion'),
       ('Photography'),
       ('Nature'),
       ('Politics'),
       ('History'),
       ('Gaming');


INSERT INTO links (link_name, short_link, long_link, create_date, last_modified_date, remove_date, id_category, id_user)
VALUES ('Google', 'G123456', 'https://www.google.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('StackOverflow', 'S123456', 'https://stackoverflow.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Wikipedia', 'W123456', 'https://www.wikipedia.org', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('GitHub', 'G234567', 'https://github.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Twitter', 'T123456', 'https://www.twitter.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Facebook', 'F123456', 'https://www.facebook.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('LinkedIn', 'L123456', 'https://www.linkedin.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('YouTube', 'Y123456', 'https://www.youtube.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Instagram', 'I123456', 'https://www.instagram.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Reddit', 'R123456', 'https://www.reddit.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Quora', 'Q123456', 'https://www.quora.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('Amazon', 'A123456', 'https://www.amazon.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Netflix', 'N123456', 'https://www.netflix.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Twitch', 'T234567', 'https://www.twitch.tv', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Pinterest', 'P123456', 'https://www.pinterest.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Microsoft', 'M123456', 'https://www.microsoft.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 2, 36),
       ('Apple', 'A234567', 'https://www.apple.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Dropbox', 'D123456', 'https://www.dropbox.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36),
       ('Slack', 'S234567', 'https://www.slack.com', NOW(), NOW(), NOW() + INTERVAL '30 days', 1, 36);

INSERT INTO users (firstname, lastname, username, email, password, create_date, last_modified_date, enabled, account_locked, role)
VALUES ('Admin', 'User', 'admin', 'admin@example.com', '$2a$10$yV30S57nDxIGXY5R6gdq6.3E/yHfP8nLekeOoM.6hoSgwhDFE8NFe', NOW(), NOW(), true, false, 'ADMIN');
