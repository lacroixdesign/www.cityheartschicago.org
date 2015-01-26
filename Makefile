.PHONY: all

content:
	rsync -azP forge@www.cityheartschicago.org:~/www.cityheartschicago.org/public/content public
	rsync -azP forge@www.cityheartschicago.org:~/www.cityheartschicago.org/craft/storage/userphotos craft/storage

deploy:
	git push origin master:production

stage:
	git push origin master:staging
