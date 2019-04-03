var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var respawn = require("utils.respawn");

const ROLE = {
    HARVESTER: 'harvester',
    BUILDER: 'builder',
    UPGRADER: 'upgrader',
}

module.exports.loop = function () {

    respawn.removeDeadFromMemory();


    respawn.respawnHero("SuperBuilder", ROLE.HARVESTER,
        [WORK, WORK, WORK, CARRY, CARRY, MOVE]);

    respawn.respawnUnderLimit(7,ROLE.HARVESTER);

    if(roleHarvester.count() > 4) {
        respawn.respawnUnderLimit(7,ROLE.UPGRADER);
        respawn.respawnUnderLimit(5,ROLE.BUILDER);
    }

    respawn.respawnHero("SuperUpgrader", ROLE.UPGRADER);
    respawn.respawnHero("SuperUpgrader2", ROLE.UPGRADER);

    respawn.respawnHero("SuperBuilder", ROLE.HARVESTER,
        [WORK, WORK, WORK, CARRY, CARRY, MOVE]);

    respawn.respawnHero("SuperHarvester", ROLE.HARVESTER,
        [WORK, WORK, WORK, CARRY, CARRY, MOVE]);

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
