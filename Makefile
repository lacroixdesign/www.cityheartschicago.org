.PHONY: all

SITE_DIR = www.cityheartschicago.org:~/www.cityheartschicago.org

%:
	@:

content:
	rsync -azP \
		$(filter-out $@,$(MAKECMDGOALS))@$(SITE_DIR)/public/content \
		public
	rsync -azP \
		$(filter-out $@,$(MAKECMDGOALS))@$(SITE_DIR)/craft/storage/userphotos \
		craft/storage

deploy:
	git push origin master:production

stage:
	git push origin master:staging
