const mongoCollections = require("../config/mongoCollections");
const IssueDataInfo = mongoCollections.IssueData;
const { ObjectId } = require("mongodb");

async function getAll() {
    const issueDataCollection = await IssueDataInfo();
    const issues = await issueDataCollection.find({}).toArray();
    for (let i = 0; i < issues.length; i++) {
        issues[i]._id = issues[i]._id.toString();
    }
    return issues;
}

async function getById(id) {
    //Error Handling
    if (!id) throw "Id parameter must be supplied";
    if (typeof (id) !== 'string') throw "Id must be a string";
    if (id.trim().length === 0) throw "Id cannot be an empty string";
    if (!ObjectId.isValid(id)) throw "Id is not a valid ObjectID";

    try {
        const issueDataCollection = await IssueDataInfo();
        const search = await issueDataCollection.findOne({ _id: new ObjectId(id) });
        if (search === null) throw "Issue not found";
        search._id = search._id.toString();
        return search;
    } catch (e) {
        throw e;
    }
}

async function createIssue(name, email, description) {

    //Error Handling
    if (!name) throw "name parameter must be supplied";
    if (typeof (name) !== 'string') throw "name must be a string";
    if (name.trim().length === 0) throw "name cannot be an empty string";

    if (!email) throw "email parameter must be supplied";
    if (typeof (email) !== 'string') throw "email must be a string";
    if (email.trim().length === 0) throw "email cannot be an empty string";

    if (!description) throw "description parameter must be supplied";
    if (typeof (description) !== 'string') throw "description must be a string";
    if (description.trim().length === 0) throw "description cannot be an empty string";

    const issueDataCollection = await IssueDataInfo();
    const newIssue = await issueDataCollection.insertOne({ name: name, email: email, description: description, status: "new"});
    return newIssue;
}

async function updateIssue(id, status) {
    //Error Handling
    if (!id) throw "Id parameter must be supplied";
    if (typeof (id) !== 'string') throw "Id must be a string";
    if (id.trim().length === 0) throw "Id cannot be an empty string";
    if (!ObjectId.isValid(id)) throw "Id is not a valid ObjectID";

    if (!status) throw "status parameter must be supplied";
    if (typeof (status) !== 'string') throw "status must be a string";
    if (status != 'new' && status != 'in progress' && status != 'resolved') throw "status must be 'new', 'in progress' or 'resolved'";

    const issueDataCollection = await IssueDataInfo();
    const updatedIssue = await issueDataCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status: status } });
    return updatedIssue;
}

module.exports = {
    getAll,
    getById,
    createIssue,
    updateIssue
}