const SPAWN_1 = "Spawn1";

module.exports = {

    removeDeadFromMemory: function() {
        _.forEach(Object.keys(Memory.creeps || {}), name => {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        })
    },

    respawnUnderLimit: function (limit, role, body = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]) {

        var screeps = _.filter(Game.creeps, (creep) => creep.memory.role === role);

        if(screeps.length < limit) {
            var newName = `${role}-${Game.time}`;
            // console.log(`Spawning new ${role}: ${newName}`);
            Game.spawns[SPAWN_1].spawnCreep(body, newName,
                {memory: {role: role}});
        }

        if(Game.spawns[SPAWN_1].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[SPAWN_1].spawning.name];
            Game.spawns[SPAWN_1].room.visual.text(
                '🛠' + spawningCreep.memory.role,
                Game.spawns[SPAWN_1].pos.x + 1,
                Game.spawns[SPAWN_1].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },

    respawnHero: function (name, role, body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE]) {
        if(!Game.creeps[name]) {
            Game.spawns[SPAWN_1].spawnCreep(body, name,
                {memory: {role: role}});
        }
    }
};
