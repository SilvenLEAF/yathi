# clean old 
rm ../../src/database/models/*
rm models/*
rm convertedModels/*

# generate models
../../node_modules/.bin/sequelize-auto sequelize-auto -o bk -d yathi -h localhost -p 5432 -u silvenleaf -x postgres -e postgres -s yathi --cm p --cp c --sg -l ts

# copy models
cp -R bk/* ../../src/database/models/
ls bk