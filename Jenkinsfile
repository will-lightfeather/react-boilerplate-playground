pipeline {
    agent {
        label "worker"
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage("env") {
            steps {
                script {
                    sh 'printenv'
                }
            }
        }
    }
}