var roleHarvester = require('./role/harvester');
var roleBuilder = require('./role/builder');
var roleUpgrader = require('./role/upgrader');
var respawn = require("./utils/respawn");
var _ = require("lodash");

const ROLE = {
    HARVESTER: 'harvester',
    BUILDER: 'builder',
    UPGRADER: 'upgrader',
}

module.exports.loop = function () {

    respawn.removeDeadFromMemory();

    respawn.respawnUnderLimit(5,ROLE.HARVESTER);
    respawn.respawnUnderLimit(10,ROLE.BUILDER);
    respawn.respawnUnderLimit(10,ROLE.UPGRADER);

    respawn.respawnHero("SuperUpgrader", ROLE.UPGRADER);
    respawn.respawnHero("SuperBuilder", ROLE.BUILDER,
        [WORK, CARRY, MOVE, MOVE, CARRY, MOVE]);


    _.forEach(Game.creeps, creep => {
        if(creep.memory.role === ROLE.HARVESTER) {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === ROLE.BUILDER) {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === ROLE.UPGRADER) {
            roleUpgrader.run(creep)
        }
    })
};
