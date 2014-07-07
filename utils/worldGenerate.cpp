#include <node.h>
#include <v8.h>
#include <stdio.h>
#include <stdlib.h>

using namespace v8;

Handle<Value> generateWorld(const Arguments& args) {
    HandleScope scope;

    Local<Object> obj = Object::New();
    //obj->Set(String::NewSymbol("x"), Number::New( 1 + (rand() % xBound->IntegerValue() )));
    return scope.Close(obj);
}

void init(Handle<Object> target) {
    target->Set(String::NewSymbol("getWorld"),
        FunctionTemplate::New(generateWorld)->GetFunction());
}
NODE_MODULE(worldgen, init)