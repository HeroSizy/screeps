var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.target === undefined) { creep.memory.target = 0 }
        if(creep.memory.harvesting === undefined) { creep.harvesting = false }

        switch(true) {
            case (!creep.memory.harvesting && creep.carry.energy === 0) ||
                 (creep.memory.harvesting && creep.carry.energy < creep.carryCapacity):
                creep.memory.harvesting = true;
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                break;

            case (!creep.memoryharvesting && creep.carry.energy > 0) :
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER)
                            && structure.energy < structure.energyCapacity;
                    }
                });

                creep.memory.target = creep.memory.target % targets.length;
                const status = creep.transfer(targets[creep.memory.target], RESOURCE_ENERGY)

                switch (status) {
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(targets[creep.memory.target], {visualizePathStyle: {stroke: '#ffffff'}});
                        break;
                    case ERR_FULL:
                        creep.memory.target = creep.memory.target + 1;
                        creep.moveTo(targets[creep.memory.target], {visualizePathStyle: {stroke: '#00FFFF'}});
                        break;
                    case ERR_NOT_ENOUGH_ENERGY:
                        creep.memory.harvesting = true;
                        break;
                }
        }
    },

    count: function() {
        return _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length;
    }
};

module.exports = roleHarvester;
