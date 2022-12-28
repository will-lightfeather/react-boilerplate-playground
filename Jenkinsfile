pipeline {
    agent {
        label "worker"
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage("env") {
            script {
                sh 'printenv'
            }
        }
    }
}