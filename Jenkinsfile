pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = "YOUR_ACCOUNT_ID"
        REGION = "ap-south-1"
        REPO = "devops-project4"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $REPO .'
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag $REPO:$IMAGE_TAG \
                $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Push to ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'aws-creds']]) {

                    sh '''
                    aws ecr get-login-password --region $REGION \
                    | docker login --username AWS --password-stdin \
                    $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

                    docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO:$IMAGE_TAG
                    '''
                }
            }
        }
    }
}
