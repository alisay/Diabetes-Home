import * as models from "./models/index.js";

export function getUser(username) {
    return models.Patient.findOne({ username }).lean();
}