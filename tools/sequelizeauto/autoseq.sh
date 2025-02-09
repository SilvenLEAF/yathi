# clean old 
rm ./src/database/models/*
rm ./tools/sequelizeauto/xbin/*

# generate models
./node_modules/.bin/sequelize-auto sequelize-auto -o ./tools/sequelizeauto/xbin -d yathi -h localhost -p 5433 -u silvenleaf -x postgres -e postgres -s yathi --cm p --cp c --sg -l ts

# copy models
cp -R ./tools/sequelizeauto/xbin/* ./src/database/models/
ls tools/sequelizeauto/xbin