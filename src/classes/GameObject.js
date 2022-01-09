class GameObject 
{
    constructor(context)
    {
        this.context = context;

        this.GenerateUID();
    }

    GenerateUID()
    {
        if(!this.context.uids)
            this.context.uids = [];

        while(true)
        {
            const tempUid = Math.floor(Math.random() * 1000);

            if(!this.context.uids.find(uid => uid == tempUid))
            {
                this.context.uids.push(tempUid);
                this.uid = tempUid;

                break;
            }
        }

        return this.uid;
    }

    Preload() {}

    Create() {}

    Update() {}
}

module.exports = GameObject;