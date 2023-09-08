import React from 'react';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import'.../';
const SignIn = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <Card shadow={true} className="shadow-lg mt-6 rounded-t-lg p-4">
          <Typography variant="h1" color="blue-gray">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-4 space-y-4" >
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
            <Button fullWidth>
              Login
            </Button>
          </form>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
