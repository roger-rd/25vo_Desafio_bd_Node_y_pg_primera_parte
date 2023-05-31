import pgk from 'pg';
const {Pool} = pgk;

export const pool = new Pool({
        allowExitOnIdle:true
})




