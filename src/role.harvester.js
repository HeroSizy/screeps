var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.target === undefined) { creep.memory.target = 0};

        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER)
                        && structure.energy < structure.energyCapacity;
                }
            });


            if(targets.length > 0) {
                creep.memory.target = creep.memory.target % targets.length;

                switch (creep.transfer(targets[creep.memory.target], RESOURCE_ENERGY)) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(targets[creep.memory.target], {visualizePathStyle: {stroke: '#ffffff'}});
                        break;
                    case ERR_FULL:
                        creep.memory.target = creep.memory.target + 1;
                        creep.moveTo(targets[creep.memory.target], {visualizePathStyle: {stroke: '#00FFFF'}});
                }
            }
        }
    },

    count: function() {
        return _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length;
    }
};

module.exports = roleHarvester;
