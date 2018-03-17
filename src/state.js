const vscode = require('vscode');
const Immutable = require('immutable');
const ImmutableCursor = require('immutable-cursor');

const mode = {
    language: 'clojure',
    scheme: 'file'
};
var data;
const initialData = {
    hostname: null,
    port: null,
    clj: null,
    cljs: null,
    connected: false,
    outputChannel: vscode.window.createOutputChannel("clojure4vscode"),
    diagnosticCollection: vscode.languages.createDiagnosticCollection('clojure4vscode: Evaluation errors')
};

reset();

const cursor = ImmutableCursor.from(data, [], (nextState, currentState) => {
    data = Immutable.fromJS(nextState);
});

function deref() {
    return data;
};

function reset() {
    data = Immutable.fromJS(initialData);
};

function config() {
    let configOptions = vscode.workspace.getConfiguration('clojure4vscode');
    return {
        format: configOptions.get("formatOnSave"),
        evaluate: configOptions.get("evalOnSave"),
        lint: configOptions.get("lintOnSave"),
        test: configOptions.get("testOnSave"),
        connect: configOptions.get("autoConnect")
    };
};

module.exports = {
    cursor,
    mode,
    deref,
    reset,
    config
};
