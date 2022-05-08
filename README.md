# Module 3 - Project

|#|Path|Description|
|-|----|-----------|
|1|POST /register | Takes in `email` and `pwd`, hash the value for password and store them in database.|
|2|POST /login | Takes in `email` and `pwd`, verify the hash and returns whether login success or fail. It should produce a JWT that encodes `id`, `email` and `user role` in a json object and return it in HTTP Response|
|3|GET /category| Returns category `id` and `description` in HTTP Response!|
|4|POST /category| Takes in `description`, and store value in database.|
|5|PUT /category/:id| Takes in `description`, and update value store in database based on the category id provided|
|6|DELETE /category/:id| Delete category store in database based on the category id provided|
|7|GET /videos| Return lists of videos in HTTP Response!|
|8|POST /videos| Takes in `category id`, `url` and `free_to_view`, and store in database.|
|9|PUT /videos/:id|  Takes in `category id`, `url` and `free_to_view`, and update value store in database based on the video id provided|
|10|DELETE /videos/:id| Delete video info store in database based on the video id provided|
|11|GET /articles| Return lists of articles in HTTP Response!|
|12|POST /articles| Takes in `category id`, `url` and `free_to_view`, and store in database.|
|13|PUT /articles/:id|  Takes in `category id`, `url` and `free_to_view`, and update value store in database based on the article id provided|
|14|DELETE /articles/:id| Delete article info store in database based on the article id provided|