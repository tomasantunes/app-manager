const db = db.getSiblingDB("app-manager");

db.createCollection("Applications");
db.createCollection("PHCGOAddOns");

print(`Database app-manager with collections created`);