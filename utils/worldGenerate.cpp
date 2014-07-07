#include <node.h>
#include <v8.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

using namespace v8;

Handle<Value> generateWorld(const Arguments& args) {
    HandleScope scope;
    
    int chunkSize = 10000;
    int coreChunkConnections; //road connections
    srand (time(NULL));
    
    coreChunkConnections = rand() % 3 + 5;
    
    Local<Object> obj = Object::New();
    //obj->Set(String::NewSymbol("x"), Number::New( 1 + (rand() % xBound->IntegerValue() )));
    return scope.Close(obj);
}

void init(Handle<Object> target) {
    target->Set(String::NewSymbol("getWorld"),
        FunctionTemplate::New(generateWorld)->GetFunction());
}
NODE_MODULE(worldgen, init)
